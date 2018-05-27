import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SignUpView from './view';
import { createUserReq } from '../../store/user';

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    createUserReq,
    toDashboard: () => push('/dashboard'),
    toHome: () => push('/')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpView)