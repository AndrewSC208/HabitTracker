import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DashboardView from './view';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
    toHome: () => push('/'),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardView)