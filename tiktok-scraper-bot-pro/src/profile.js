function parseProfile(state) {
    const data = state["webapp.user-detail"]?.userInfo;
    if (!data) return null;

    const user = data.user;
    const stats = data.stats;

    return {
        id: user.id,
        username: user.uniqueId,
        nickname: user.nickname,
        bio: user.signature,
        avatar: user.avatarLarger,
        verified: user.verified,
        private: user.privateAccount,
        follower: stats.followerCount,
        following: stats.followingCount,
        likes: stats.heartCount,
        videoCount: stats.videoCount,
        bioLink: user.bioLink?.link || null
    };
}

module.exports = { parseProfile };
