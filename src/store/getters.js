
const getters = {
  language: state => state.app.language,
  token: state => state.app.orderingManageToken,
  currentStore: state => state.app.currentStore,
  storeList: state => state.app.storeList,
  requestData: state => state.app.requestData,
  showNaviBar: state => state.app.showNaviBar,
  orderResData: state => state.app.orderResData,
  mobile_inf: state => state.app.mobile_inf,
  pwd: state => state.app.pwd,
  toolsToken: state => state.app.toolsToken,
  toolsLanguage: state => state.app.toolsLanguage,
}
export default getters