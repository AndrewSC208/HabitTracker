import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DashboardView from './view';

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardView)