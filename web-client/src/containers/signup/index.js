import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SignUpView from './view';

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toDashboard: () => push('/dashboard'),
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpView)