import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

import './style.less'
import Reco from '../../components/Reco'

class Search extends React.Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            value: '',
            data: [],
            isShow: false,
            searchList: ['他的国','陪你到世界终结','雨季不再来','总裁老婆','穿越狂妃','宠婚','黑道男友','伪装者','重生']
        }
    }
    render() {
        return (
            <div>
                <div className="search-head">
                    <span onClick={() => this.changeRoute()} className="icon-chevron-left"></span>
                    <div className="home-inp">
                        <span className="icon-search"></span>
                        <input className="search-inp" type="text" onFocus={() => this.focusHandle()} onChange={(e) => this.changeHandle(e)} onKeyUp={(e) => this.keyHandle(e)} placeholder="何所冬暖，何所夏凉" />
                    </div>
                </div>
                {
                    this.state.isShow
                    ? <div>
                        <div className="hot-title">
                            <span className="hot-title-left">大家热搜</span>
                            <span className="hot-title-right">换一批</span>
                        </div>
                        <div className="hot-list">
                            <ul>
                                {
                                    this.state.searchList.map((item,i)=> {
                                        return <li key={i} onClick={() => this.changeValue(item)}>{item}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    :''
                }
                {
                    this.state.data.length
                    ?this.state.data.map((item,i)=> {
                        return <Reco key={i} obj={item}/>
                    })
                    :''
                }
                
            </div>
        )
    }
    changeValue(item){
        this.setState({
            isShow: false
        })
        this.getDataList(item);
    }
    focusHandle(){
        this.setState({
            isShow: true
        })
    }
    changeRoute(){
        hashHistory.goBack();
    }
    changeHandle(e){
        this.setState({
            value: e.target.value
        })
    }
    keyHandle(e){
        if(e.keyCode!==13) return;
        this.setState({
            isShow: false
        })
        this.getDataList(this.state.value);
    }
    getDataList(value){
        var arr = [];
        this.props.booksinfo.forEach((item,i)=>{
            if(item.title.indexOf(value) !== -1){
                arr.push(item);
            }
        })
        this.setState({
            data:arr
        })
    }
}

const mapStateToProps = (state) => {
    return {
        booksinfo: state.booksinfo.booksinfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)
