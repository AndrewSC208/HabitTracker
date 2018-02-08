
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LoginView from './view';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
    toDashboard: () => push('/dashboard'),
    toHome: () => push('/')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView)