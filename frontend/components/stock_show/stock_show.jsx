import React from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { getStockData, getCompanyInfo, getCompanyStats } from '../../util/company_api_util';
import NewsContainer from '../home_page/news_container';
import FormContainer from './form_container';
import { withRouter } from 'react-router-dom';

class StockShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.renderStock = this.renderStock.bind(this);
        this.formatData = this.formatData.bind(this);
        this.percentChange = this.percentChange.bind(this);
        this.monetaryChange = this.monetaryChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
        this.marketCapHelper = this.marketCapHelper.bind(this);
        this.peHelper = this.peHelper.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentHelper () {
        this.ticker = this.props.ticker.toLowerCase();
        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        const month = lastWeek.getMonth() < 10 ? `0${lastWeek.getMonth() + 1}` : `${lastWeek.getMonth() + 1}`;
        const day = lastWeek.getDate() < 10 ? `0${lastWeek.getDate()}` : `${lastWeek.getDate()}`;
        const lastWeekString = `${lastWeek.getFullYear()}${month}${day}`;
        getStockData(this.ticker, '1m').then(data => this.setState({ oneMonth: data }));
        getStockData(this.ticker, `date/${lastWeekString}`).then(data => this.setState({ oneWeek: data }));
        getStockData(this.ticker, '3m').then(data => this.setState({ threeMonth: data }));
        getStockData(this.ticker, '1y').then(data => (this.setState({ oneYear: data })));
        getStockData(this.ticker, '5y').then(data => this.setState({ fiveYear: data }));
        getStockData(this.ticker, '1m').then(data => this.setState({ data: data }));
        getStockData(this.ticker, '1d').then(data => this.setState({ oneDay: data }));
        getCompanyInfo(this.ticker).then(data => this.setState({ info: data }));
        getCompanyStats(this.ticker).then(data => this.setState({ stats: data }));
        this.intervalId = setInterval(() => this.ajaxHelper(this.ticker), 10000);
        this.setState({ props: this.props.history.location.pathname });
        this.props.fetchCompanies();
        this.props.fetchWatchlistIndex().then(() => {
            this.watchlistBool() ? this.setState({ watchlist: true }) : this.setState({ watchlist: false })
        });
    }

    componentDidMount() {
        this.componentHelper();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    ajaxHelper(ticker) {
        getStockData(ticker, '1d').then(data => this.setState({ oneDay: data }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
            clearInterval(this.intervalId);
            this.componentHelper();
        }
    }

    formatData(data) {
        const newData = data.map(dataPoint => {
            if (dataPoint.date[4] === '-') {
                let jsDate = new Date(dataPoint.date);
                let dateArr = jsDate.toDateString().slice(4).split(' ');
                let newDate = dateArr[0] + ' ' + dateArr[1] + ', ' + dateArr[2];
                return { Date: newDate, Price: dataPoint.close };
            } else {
                return { Date: dataPoint.label, Price: dataPoint.close };
            }
        })
        return newData;
    }

    percentChange(currentValue) {
        const initialPrice = this.state.data[0].close;
        const percent = (((currentValue - initialPrice) / initialPrice) * 100).toFixed(2);
        return `(${percent}%)`;
    }

    monetaryChange(currentValue) {
        const initialPrice = this.state.data[0].close;
        const change = (currentValue - initialPrice).toFixed(2);
        if (change > 0) {
            return `+$${Math.abs(change)}`;
        } else {
            return `-$${Math.abs(change)}`;
        }
    }

    handleClick(timePeriod) {
        let newData;
        if (timePeriod === '1m') {
            newData = this.state.oneMonth;
            this.setState({ data: newData });
        } else if (timePeriod === '1w') {
            newData = this.state.oneWeek;
            this.setState({ data: newData });
        } else if (timePeriod === '3m') {
            newData = this.state.threeMonth;
            this.setState({ data: newData });
        } else if (timePeriod === '1y') {
            newData = this.state.oneYear;
            this.setState({ data: newData });
        } else if (timePeriod === '1d') {
            newData = this.state.oneDay;
            this.setState({ data: newData });
        } else {
            newData = this.state.oneDay;
            this.setState({ data: newData });
        }
    }



    renderStock() {
        let newData = this.formatData(this.state.data);
        return (
            <LineChart width={675} height={196} data={newData}>
                <Line
                    type='monotone'
                    dataKey='Price'
                    stroke='#21ce99'
                    dot={false}
                    strokeWidth={2}
                />
                <XAxis dataKey='Date' hide={true} width={676} />
                <YAxis
                    type='number'
                    domain={['dataMin', 'dataMax']}
                    stroke="white"
                >
                </YAxis>
                <Tooltip
                    className='tooltip'
                    contentStyle={{ border: '0', backgroundColor: 'transparent' }}
                    position={{ y: -120, x: 50 }}
                    isAnimationActive={false}
                    labelFormatter={value => <div className='date-div'>{value}</div>}
                    active={true}
                    formatter={value => {
                        value = value.toFixed(2);
                        let percent = this.percentChange(value);
                        let money = this.monetaryChange(value);
                        return [
                            <div className='tooltip-value-div'>
                                <p className='portval-p'>
                                    {'$' + new Intl.NumberFormat('en').format(value)}
                                </p>
                                <div className='tooltip-change-div'>
                                    <p>{money} {percent}</p>
                                </div>
                            </div>, null
                        ]
                    }}

                />
            </LineChart>
        )


    }

    renderButtons() {
        return (
            <div className='graph-button-div'>
                <button className='graph-button' onClick={() => this.handleClick('1d')}>
                    1D
                    </button>
                <button className='graph-button' onClick={() => this.handleClick('1w')}>
                    1W
                    </button>
                <button className='graph-button' onClick={() => this.handleClick('1m')}>
                    1M
                    </button>
                <button className='graph-button' onClick={() => this.handleClick('3m')}>
                    3M
                    </button>
                <button className='graph-button' onClick={() => this.handleClick('1y')}>
                    1Y
                    </button>
                <button className='graph-button' onClick={() => this.handleClick('all')}>
                    ALL
                    </button>
            </div>
        );
    }

    renderInfo() {
        return (
            <div className='total-info-div'>
                <div className='company-about-div'>
                    <h1>About</h1>
                    <p>
                        {this.state.info.description}
                    </p>
                </div>
                <div className='stats-info-div'>
                    <div className='info-div'>
                        <div className='indi-info-div'>
                            <p id='tag'>
                                CEO
                            </p>
                            <p id='info'>
                                {this.state.info.CEO}
                            </p>
                        </div>
                        <div className='indi-info-div'>
                            <p id='tag'>
                                Exchange
                            </p>
                            <p id='info'>
                                {this.state.info.exchange}
                            </p>
                        </div>
                        <div className='indi-info-div'>
                            <p id='tag'>
                                Industry
                            </p>
                            <p id='info'>
                                {this.state.info.industry}
                            </p>
                        </div>
                        <div className='indi-info-div'>
                            <p id='tag'>
                                Company Website
                            </p>
                            <p id='info'>
                                <a href={this.state.info.website} id='website'>
                                    {this.state.info.website.slice(7)}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className='info-div'>
                        <div className='indi-info-div'>
                            <p id='tag'>
                                Market Cap
                            </p>
                            <p id='info'>
                                {this.marketCapHelper(this.state.stats.marketcap)}
                            </p>
                        </div>
                        <div className='indi-info-div'>
                            <p id='tag'>
                                Dividend
                            </p>
                            <p id='info'>
                                {this.state.stats.dividendYield.toFixed(2)}
                            </p>
                        </div>
                        <div className='indi-info-div'>
                            <p id='tag'>
                                Price-Earnings Ratio
                            </p>
                            <p id='info'>
                                {this.peHelper(this.state.stats.peRatioHigh, this.state.stats.peRatioLow)}
                            </p>
                        </div>
                        <div className='indi-info-div'>
                            <p id='tag'>
                                EPS
                            </p>
                            <p id='info'>
                                {this.state.stats.ttmEPS.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    marketCapHelper(marketCap) {
        if (marketCap > 1000000000) {
            return (marketCap / 1000000000).toFixed(2) + 'B';
        } else if (marketCap > 1000000) {
            return (marketCap / 1000000000).toFixed(2) + 'M';
        } else {
            return marketCap.toFixed(2);
        }
    }

    peHelper(low, high) {
        return ((high + low) / 2).toFixed(2);
    }

    handleHome(e) {
        e.preventDefault();
        this.props.history.push('/home');
    }

    
    idHelper() {
        for (let i = 0; i < this.props.companies.length; i++) {
            if (this.props.companies[i].ticker.toLowerCase() === this.ticker.toLowerCase()) {
                return this.props.companies[i].id;
            }
        }
    }
    
    removeItem(e) {
        e.preventDefault(e);
        Object.values(this.props.watchlistItems).forEach(ele => {
            if (ele.ticker.toLowerCase() === this.ticker.toLowerCase()) {
                this.props.deleteWatchlistItem(ele.id).then(() => {
                    this.setState({watchlist: false});
                })
            }
        });
    }

    validAdd () {
        const watchlistTickers = Object.values(this.props.watchlistItems).map(ele => {
            return ele.ticker.toLowerCase();
        });
        return !watchlistTickers.includes(this.ticker.toLowerCase());
    }

    addItem(e) {
        e.preventDefault(e);
        const newItem = {user_id: this.props.currentUser,
            company_id: this.idHelper(),
            ticker: this.ticker.toLowerCase()
        };
        if (this.validAdd()) {
            this.props.createWatchlistItem(newItem).then(() => {
                this.setState({watchlist: true});
            });
        }
    } 

    watchlistBool () {
        const watchedCompanies = Object.values(this.props.watchlistItems).map(ele => {
            return ele.ticker.toLowerCase();
        });
        return watchedCompanies.includes(this.ticker);
    }

    renderWatchButton() {
            if (this.state.watchlist) {
                return (
                    <button onClick={this.removeItem} id='watch-button'>
                        Remove from Watchlist
                    </button>
                );
            } else if (!this.state.watchlist) {
                return (
                    <button onClick={this.addItem} id='watch-button'>
                        Add to Watchlist
                    </button>
                );
            }
        
    }

    render() {
        if (Object.keys(this.state).length === 11) {
            return (
                <div>
                    <div className='robenhood-header' onClick={this.handleHome}>
                        <h2 className='robenhood-h2'>
                            <i className="fas fa-feather-alt"></i>
                            robenhood
                        </h2>
                    </div>
                    <div className='stock-show-div'>
                        <div className='company-name'>
                            <h1 id='company-name'>
                                {this.state.info.companyName}
                            </h1>
                        </div>
                        <div className='graph-div-show'>
                            <div className='line-div'>
                                {this.renderStock()}
                            </div>
                            {this.renderButtons()}
                            {this.renderInfo()}
                        </div>
                        <div className='form-watch-div'>
                            <div>
                                <FormContainer props={this.state} ticker={this.ticker} />
                            </div>
                            <div className='watch-button-div'>
                                {this.renderWatchButton()}
                            </div>
                        </div>
                        <div className='show-news'>
                            <NewsContainer />
                        </div>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

export default withRouter(StockShow);