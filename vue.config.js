module.exports = {
    // 개발 서버 설정
    devServer: {
        // 프록시 설정
        proxy: {
            // 프록시 요청을 보낼 api의 시작 부분
            '/until15': {
                // 프록시 요청을 보낼 서버의 주소
                target: 'http://localhost:9090',
                changeOrigin: true,
                logLevel: 'debug',
            }
        },
       
    },

    

    // 리소스의 위치
    publicPath : '/until15/vue'

};
