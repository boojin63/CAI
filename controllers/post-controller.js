const db = require('../config/db');

// 게시글 생성
exports.createPost = (req, res) => {
    const { post_id, title, content, image_url } = req.body;
    const user_id = req.session.user_id; // 세션에서 로그인된 사용자 ID 가져오기

    if (!user_id) {
        return res.status(401).json({ error: '로그인 상태가 아닙니다.' });
    }

    const query = `
        INSERT INTO Post (post_id, title, content, user_id, created_at, updated_at, image_url)
        VALUES (?, ?, ?, ?, NOW(), NOW(), ?)
    `;

    db.query(query, [post_id, title, content, user_id, image_url], (error, results) => {
        if (error) {
            console.error('게시글 작성 오류:', error);
            return res.status(500).json({ error: '게시글 작성에 실패했습니다.' });
        }
        res.status(200).json({ message: '게시글 작성 성공', post_id });
    });
};

// 게시글 삭제
exports.deletePost = (req, res) => {
    const { post_id } = req.params;
    const user_id = req.session.user_id; // 세션에서 로그인된 사용자 ID 가져오기

    if (!user_id) {
        return res.status(401).json({ error: '로그인 상태가 아닙니다.' });
    }

    // 게시글 작성자 확인 쿼리
    const checkQuery = `SELECT user_id FROM Post WHERE post_id = ?`;
    db.query(checkQuery, [post_id], (error, results) => {
        if (error) {
            console.error('게시글 조회 오류:', error);
            return res.status(500).json({ error: '게시글 조회에 실패했습니다.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: '해당 게시글을 찾을 수 없습니다.' });
        }

        const postOwnerId = results[0].user_id;

        // 게시글 작성자와 세션의 사용자 ID 비교
        if (postOwnerId !== user_id) {
            return res.status(403).json({ error: '게시글 삭제 권한이 없습니다.' });
        }

        const deleteQuery = `DELETE FROM Post WHERE post_id = ?`;
        db.query(deleteQuery, [post_id], (error, results) => {
            if (error) {
                console.error('게시글 삭제 오류:', error);
                return res.status(500).json({ error: '게시글 삭제에 실패했습니다.' });
            }

            res.status(200).json({ message: '게시글 삭제 성공', post_id });
        });
    });
};

// 게시글 수정
exports.updatePost = (req, res) => {
    const { post_id } = req.params;
    const { title, content, image_url } = req.body;
    const user_id = req.session.user_id; // 세션에서 로그인된 사용자 ID 가져오기

    if (!user_id) {
        return res.status(401).json({ error: '로그인 상태가 아닙니다.' });
    }

    // 게시글 작성자 확인 쿼리
    const checkQuery = `SELECT user_id FROM Post WHERE post_id = ?`;
    db.query(checkQuery, [post_id], (error, results) => {
        if (error) {
            console.error('게시글 조회 오류:', error);
            return res.status(500).json({ error: '게시글 조회에 실패했습니다.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: '해당 게시글을 찾을 수 없습니다.' });
        }

        const postOwnerId = results[0].user_id;

        // 게시글 작성자와 세션의 사용자 ID 비교
        if (postOwnerId !== user_id) {
            return res.status(403).json({ error: '게시글 수정 권한이 없습니다.' });
        }

        const updateQuery = `
            UPDATE Post 
            SET title = ?, content = ?, image_url = ?, updated_at = NOW()
            WHERE post_id = ?
        `;
        db.query(updateQuery, [title, content, image_url, post_id], (error, results) => {
            if (error) {
                console.error('게시글 수정 오류:', error);
                return res.status(500).json({ error: '게시글 수정에 실패했습니다.' });
            }

            res.status(200).json({ message: '게시글 수정 성공', post_id });
        });
    });
};
