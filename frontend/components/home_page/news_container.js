import { connect } from 'react-redux';
import { fetchPortfolioNews } from '../../actions/news_actions';
import News from './news'

const msp = (state) => {
    let news = state.entities.news.articles || [];
    return {articles: news}
};

const mdp = (dispatch) => ({
    fetchPortfolioNews: () => dispatch(fetchPortfolioNews())
});

export default connect(msp, mdp)(News);