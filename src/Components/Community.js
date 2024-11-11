import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import '../Css/Community.css';

const Community = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const [totalPosts, setTotalPosts] = useState(1);
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const [posts, setPosts] = useState([]);
    const [userType, setUserType] = useState('admin'); // 사용자 유형 상태: 'guest', 'member', 'admin'
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [isWriting, setIsWriting] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);

    useEffect(() => {
        // 서버로부터 로그인한 사용자 정보를 가져오기
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('/api/user-info');
                if (response.status === 200) {
                    setLoggedInUserId(response.data.userId);
                    setUserType(response.data.userType);
                }
            } catch (error) {
                console.error('사용자 정보를 불러오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const getCurrentPosts = () => {
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        return filteredPosts.slice(start, end);
    };

    const handleViewPost = async (id) => {
        const post = posts.find((post) => post.post_id === id);
        setSelectedPost(post);
    
        try {
            await axios.put(`/api/posts/view/${id}`);
            
            const updatedPosts = posts.map((p) =>
                p.post_id === id ? { ...p, views: p.views + 1 } : p
            );
            setPosts(updatedPosts);
            setFilteredPosts(updatedPosts);
        } catch (error) {
            console.error('조회수 업데이트 중 오류가 발생했습니다:', error);
        }
    };
    
    const handleWriteButtonClick = () => {
        setIsWriting(true);
    };

    const handleCancelWrite = () => {
        setIsWriting(false);
        setTitle('');
        setContent('');
        setAttachments([]);
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        const attachmentsData = await Promise.all(files.map(async (file) => {
            const base64 = await convertToBase64(file);
            return { name: file.name, type: file.type, data: base64 };
        }));
        setAttachments([...attachments, ...attachmentsData]);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmitWrite = async (e) => {
        e.preventDefault();
        if (title.trim() === '' || content.trim() === '') {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }
        if (title.length > 10) {
            alert('제목은 10자 이하로 입력해주세요.');
            return;
        }
        if (content.length > 500) {
            alert('내용은 500자 이하로 입력해주세요.');
            return;
        }        

        const newPost = {
            post_id: Date.now().toString(),
            title,
            content,
            user_id: loggedInUserId,
            image_url: attachments.length > 0 ? attachments[0].data : null,
        };

        try {
            const response = await axios.post('/api/posts/create', newPost);
            if (response.status === 200) {
                const updatedPosts = [response.data, ...posts];
                setPosts(updatedPosts);
                setFilteredPosts(updatedPosts);
                setTotalPosts(updatedPosts.length);
                setIsWriting(false);
                setTitle('');
                setContent('');
                setAttachments([]);
            }
        } catch (error) {
            console.error('글 작성 중 오류가 발생했습니다:', error);
            alert('글 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleDeletePost = async (id) => {
        const post = posts.find((post) => post.post_id === id);
        if (userType === 'member' && post.user_id !== loggedInUserId) {
            alert('자신이 작성한 글만 삭제할 수 있습니다.');
            return;
        }

        if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            try {
                const response = await axios.delete(`/api/posts/delete/${id}`);
                if (response.status === 200) {
                    const updatedPosts = posts.filter((post) => post.post_id !== id);
                    setPosts(updatedPosts);
                    setFilteredPosts(updatedPosts);
                    setTotalPosts(updatedPosts.length);
                    setSelectedPost(null);
                }
            } catch (error) {
                console.error('글 삭제 중 오류가 발생했습니다:', error);
                alert('글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    const handleEditPost = (post) => {
        if ((userType === 'member' && post.user_id !== loggedInUserId) || (userType === 'admin' && post.user_id !== 'admin')) {
            alert('자신이 작성한 글만 수정할 수 있습니다.');
            return;
        }

        setIsWriting(true);
        setTitle(post.title);
        setContent(post.content);
        setAttachments([{ data: post.image_url }]);
        setSelectedPost(post);
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        if (title.trim() === '' || content.trim() === '') {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        const updatedPost = {
            title,
            content,
            image_url: attachments.length > 0 ? attachments[0].data : null,
        };

        try {
            const response = await axios.put(`/api/posts/update/${selectedPost.post_id}`, updatedPost);
            if (response.status === 200) {
                const updatedPosts = posts.map((post) =>
                    post.post_id === selectedPost.post_id
                        ? { ...post, ...updatedPost }
                        : post
                );
                setPosts(updatedPosts);
                setFilteredPosts(updatedPosts);
                setTotalPosts(updatedPosts.length);
                setIsWriting(false);
                setTitle('');
                setContent('');
                setAttachments([]);
                setSelectedPost(null);
            }
        } catch (error) {
            console.error('글 수정 중 오류가 발생했습니다:', error);
            alert('글 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleFileRemove = (index) => {
        const updatedAttachments = [...attachments];
        updatedAttachments.splice(index, 1);
        setAttachments(updatedAttachments);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter((post) =>
                post.title.includes(query) || post.content.includes(query) || post.user_id.includes(query)
            );
            setFilteredPosts(filtered);
        }
    };

    const openModal = (media) => {
        setSelectedMedia(media);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMedia(null);
    };

    useEffect(() => {
        // 서버로부터 초기 게시글 목록 불러오기
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                if (response.status === 200) {
                    setPosts(response.data);
                    setFilteredPosts(response.data);
                    setTotalPosts(response.data.length);
                }
            } catch (error) {
                console.error('게시글 불러오기 중 오류가 발생했습니다:', error);
            }
        };

        fetchPosts();
    }, []);

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={i === currentPage ? 'active' : ''}
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(i);
                    }}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div>
            <Header />
            <div className="CommunityContainer">
                {isWriting ? (
                    // 글 작성 표시
                    <div className="CommunityWritePostContainer">
                        <form onSubmit={selectedPost ? handleSubmitEdit : handleSubmitWrite} className="CommunityWritePostForm">
                            <div className="CommunityFormGroup">
                                <label htmlFor="title">제목</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="제목을 입력하세요."
                                    maxLength="10"
                                />
                            </div>
                            <div className="CommunityFormGroup">
                                <label htmlFor="content">내용</label>
                                <textarea 
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="내용을 입력하세요."
                                    maxLength="500"
                                />
                            </div>
                            <div className="CommunityFormGroup">
                                <label htmlFor="attachments"></label>
                                <input
                                    type="file"
                                    id="attachments"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="CommunityAttachmentsPreview">
                                {attachments.map((file, index) => (
                                    <div key={index} className="CommunityAttachmentItem" onClick={() => openModal(file)}>
                                        <button onClick={(e) => { e.stopPropagation(); handleFileRemove(index); }} className="CommunityRemoveFileBtn">✖️</button>
                                        {file.type && file.type.startsWith('image') ? (
                                            <img src={file.data} alt="attachment" className="CommunityAttachmentPreview" />
                                        ) : file.type && file.type.startsWith('video') ? (
                                            <video src={file.data} controls className="CommunityAttachmentPreview" />
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                            <div className="CommunityFormActions">
                                <button type="submit" className="CommunitySubmitBtn">{selectedPost ? '수정 완료' : '작성 완료'}</button>
                                <button type="button" className="CommunityCancelBtn" onClick={handleCancelWrite}>취소</button>
                            </div>
                        </form>
                    </div>
                ) : selectedPost ? (
                    // 선택한 게시물 보기
                    <div className="CommunityPostViewContainer">
                        <div className="CommunityPostViewBtnContainer">
                            <button className="CommunityBackBtn" onClick={() => window.location.reload()}>뒤로 가기</button>
                            {((userType === 'member' && selectedPost.user_id === loggedInUserId) ||
                                (userType === 'admin' && selectedPost.user_id === 'admin')) && (
                                    <div className="CommunityFormActions">
                                        <button className="MemberEditBtn" onClick={() => handleEditPost(selectedPost)}>수정</button>
                                        {userType === 'member' && selectedPost.user_id === loggedInUserId && (
                                            <button className="MemberDeleteBtn" onClick={() => handleDeletePost(selectedPost.post_id)}>삭제</button>
                                        )}
                                    </div>
                                )}
                        </div>
                        <div className="CommunityPostViewHeader">
                            <h3>제목 {selectedPost.title}</h3>
                            <p>작성자: {selectedPost.user_id}</p>
                        </div>
                        <div className="CommunityPostContent">
                            <p>{selectedPost.content}</p>
                            {selectedPost.image_url && (
                                <div className="CommunityAttachmentsPreview">
                                    <img src={selectedPost.image_url} alt="attachment" className="CommunityAttachmentPreview" />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // 게시물 목록 보기
                    <>
                        <div className="CommunitySearchSection">
                            <div className="CommunitySearchBarContainer">
                                <input type="text" className="CommunitySearchBar" value={searchQuery} onChange={handleSearch} placeholder="검색어를 입력하세요." />
                            </div>
                            {userType !== 'guest' && (
                                <button className="CommunityWriteBtn" onClick={handleWriteButtonClick}>글쓰기</button>
                            )}
                        </div>
                        <div className="CommunityPostList">
                            <table className="CommunityPostTable">
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>제목</th>
                                        <th>작성자</th>
                                        <th>작성일</th>
                                        <th>조회수</th>
                                        {userType === 'admin' && <th>관리</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {getCurrentPosts().map((post, index) => (
                                        <tr key={post.post_id}>
                                            <td>{index + 1 + (currentPage - 1) * postsPerPage}</td>
                                            <td
                                                style={{ color: post.user_id === 'admin' ? 'red' : 'black', cursor: 'pointer' }}
                                                onClick={() => handleViewPost(post.post_id)}
                                            >
                                                {post.title}
                                            </td>
                                            <td>{post.user_id}</td>
                                            <td>{post.created_at}</td>
                                            <td>{post.views}</td>
                                            {userType === 'admin' && (
                                                <td>
                                                    <button className="AdminDeleteBtn" onClick={() => handleDeletePost(post.post_id)}>삭제</button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="CommunityPage">
                            {renderPagination()}
                        </div>
                    </>
                )}
                {isModalOpen && (
                    <div className="CommunityModalOverlay" onClick={closeModal}>
                        <div className="CommunityModalContent" onClick={(e) => e.stopPropagation()}>
                            <button className="CommunityModalCloseBtn" onClick={closeModal}>✖️</button>
                            {selectedMedia.type && selectedMedia.type.startsWith('image') ? (
                                <img src={selectedMedia.data} alt="attachment" className="CommunityModalMedia" />
                            ) : selectedMedia.type && selectedMedia.type.startsWith('video') ? (
                                <video src={selectedMedia.data} controls className="CommunityModalMedia" />
                            ) : null}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Community;
