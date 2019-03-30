import React from 'react';
import { LineChart, Line } from 'recharts';

class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.oneYearData = this.oneYearData.bind(this);
        this.state = {data: []};
        this.getSharesObj = this.getSharesObj.bind(this);
        this.dateHelper = this.dateHelper.bind(this);
        this.getNumShares = this.getNumShares.bind(this);
    }

    // test

    componentDidMount() {
        this.props.fetchTransactions();
        this.props.getStockData('aapl', '1m').then(() => this.oneYearData());
        
    }

    oneYearData () {
        let result = this.props.data.map(day => {
            return {
                name: day.date,
                uv: day.close,
            }
        });
        this.setState({data: result});
    }

    // state.entities.transaction is array of hash
// array => ele (hash), ele.company_id => store unique company ids in hash?
// obj = {}
// if obj[ele.company_id] === undefined
// obj[ele.company_id] = [{---below---}]
// else obj[ele.company_id].push({---below---})
// should be in order of trans
// new Date(...)
// date = Math.abs(ele.date - ele.today)
// obj = { ele.company_id: [{ele.transaction_type, ele.FORMATDATE, ele.shares, ele.price?}, ...]}

 
    dateHelper (date) {
        let today = new Date();
        let past = new Date(date);
        let difference = Math.abs((today - past) / 1000 / 60 / 60 / 24);
        return Math.floor(difference);
    }

    getSharesObj () {
        let sharesObj = {};
        let transactions = this.props.transactions;
        transactions.forEach(trans => {
            if (sharesObj[trans.company_id] === undefined) {
                sharesObj[trans.company_id] = [{ 
                    transaction_type: trans.transaction_type,
                    date: this.dateHelper(trans.date),
                    shares: trans.shares
                 }]
            } else {
                sharesObj[trans.company_id].push({
                        transaction_type: trans.transaction_type,
                        date: this.dateHelper(trans.date),
                        shares: trans.shares
                    })
            }
        });
        debugger;
        return sharesObj;
    }
// get obj[ele.company_id] and create array using ele.date to fill empty?
// arr1 = [...Array(days)]
// arr2 = [...Array(days)]
// loop thru obj[ele.company_id]
    // arr1[arr1.length - obj[ele.company_id].date] = obj[ele.comapny_id].shares
// loop thru arr2
// set arr2[0] = arr1[0], then do arr2[i] = arr2[i-1] + arr1[i]
// now have array of num shares
// turn into array of hash at certain time starting from earlest
// { -50: 250, -49: 350 } until 0

    getNumShares () {
        let sharesObj = this.getSharesObj();
        let company_ids = Object.keys(sharesObj);
        let numSharesObj = {};
        company_ids.forEach(id => {
            numSharesObj[id] = {
                rateOfChange: [...Array(sharesObj[id][0].date + 1)].fill(0),
                integral: [...Array(sharesObj[id][0].date + 1)].fill(0)
            }; 
        });
        let arr1;
        company_ids.forEach(id => {
            arr1 = numSharesObj[id]['rateOfChange'];
            sharesObj[id].forEach(trans => {
                arr1[arr1.length - trans.date - 1] += trans.shares;
            });
        });
        let arr2;
        let output = {};
        company_ids.forEach(id => {
            arr2 = numSharesObj[id]['integral'];
            arr1 = numSharesObj[id]['rateOfChange'];
            arr2.forEach((ele, idx) => {
                if (idx === 0) {
                    arr2[idx] = arr1[idx];
                } else {
                    arr2[idx] = arr2[idx - 1] + arr1[idx];
                }
            })
            output[id] = arr2;
        });
        debugger;
        return output;
    }


    render () {
        return (
            <div>
                <div className='line-div'>
                    <LineChart width={400} height={400} data={this.state.data}>
                        <Line type='monotone' dataKey='uv' stroke='#21ce99'/>
                    </LineChart>
                </div>
                <button onClick={this.getNumShares}>
                    TEST
                </button>
            </div>
         
        )
    }

}

export default Graph;



