import { createStore } from "vuex";

export default createStore({
    // 상태변수
    state : {
        logged : false,
        menu   : sessionStorage.getItem("TOKEN"), // 선택되는 메뉴
        memail : sessionStorage.getItem("MEMAIL"),         // 로그인한 사용자의 이메일정보
        mname  : '',         // 로그인한 사용자의 이름
        token  : sessionStorage.getItem("TOKEN"),         // 토큰을 저장소에 보관하지 않고 사용   
        mrole  : '',  
               // 로그인한 사용자의 권한을 저장  
    },

    // getters => App.vue
    getters : {
        getLogged(state) {
            return state.logged;
        },

        getMrole(state){
            return state.mrole;
        },
        getMemail(state){
            return state.memail;
        },
        getMname(state){
            return state.mname;
        },
        getMenu(state){
            return state.menu;
        },
    },

    // mutations => Login.vue, Logout.vue
    mutations : {
        setLogged(state, value) {
            state.logged = value;
        },

        setMrole(state, value){
            state.mrole = value;
        },
        setMemail(state, memail){
            state.memail = memail;
        },
        setMname(state, value){
            state.mname = value;
        },
        setMenu(state, value){
            state.menu = value;
        },
        ClearMemail(state){
            state.memail = '';
        }
    },

    actions : {
       
     
            // mutations의 setUid, setUname을 호출해서 내용변경
                    
                   
                
                
        
    }
    
        
})