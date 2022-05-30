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

        // routine
        routine : '',
        rtnname : '',
        rtnday  : '',
        pname   : '',
        ppart   : '',
        rtncnt  : '',
        rtnset  : '',

        // like
        
        dialog : '',
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

        // routine
        getRoutine(state){
            return state.routine
        },
        getRtnname(state){
            return state.rtnname
        },
        getRtnday(state){
            return state.rtnday
        },
        getPname(state){
            return state.pname
        },
        getPpart(state){
            return state.ppart
        },
        getRtncnt(state){
            return state.rtncnt
        },
        getRtnset(state){
            return state.rtnset
        },

        getDialog(state){
            return state.dialog
        }
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
        },

        // routine
        setRoutine(state, value) {
            console.log("setRoutine", value);
            state.routine = value;
        },
        setRtnname(state, value) {
            console.log("setRtnname", value);
            state.rtnname = value;
        },
        setRtnday(state, value) {
            console.log("setRtnday", value);
            state.rtnday = value;
        },
        setPname(state, value) {
            console.log("setPname", value);
            state.pname = value;
        },
        setPpart(state, value) {
            console.log("setPpart", value);
            state.ppart = value;
        },
        setRtncnt(state, value) {
            console.log("setRtncnt", value);
            state.routine = value;
        },
        setRtnset(state, value) {
            console.log("setRtnset", value);
            state.rtnset = value;
        },
        setDialog(state, value) {
            console.log("setDialog", value);
            state.dialog = value;
        }
    },

    actions : {
       
        // mutations의 setUid, setUname을 호출해서 내용변경

    }
    
        
})