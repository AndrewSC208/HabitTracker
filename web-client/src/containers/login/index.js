import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LoginView from './view';
import { loginUserReq } from '../../store/user/actions'

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUserReq,
    toDashboard: () => push('/dashboard'),
    toHome:      () => push('/')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView)