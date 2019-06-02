import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
// import { robots } from '../robots';
import { connect } from "react-redux";
import { setSearchField } from "../actions";

const mapStateToProps = (state) => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) =>dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {

    constructor(){
        super();
        this.state = {
            robots: []
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res=>{return res.json()})
        .then(data=>{this.setState({robots:data})})
    }

    // onSearchChange = (event) => {
    //     this.setState({searchField: event.target.value})
    // }

    render(){
        const filteredRobots = this.state.robots.filter((robot) => {
            return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase());
        });

        return (
            <div className="tc">
                <h1>ROBOFRIENDS</h1>
                <SearchBox searchChange = {this.props.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);