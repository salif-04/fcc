import React from 'react';
import { Promise, resolve, reject } from 'q';

let request = require('request');

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="text" className="text-monospace font-weight-bold">
        <i className="font-weight-bolder font-italic" style={{"fontSize":"5em"}}>"</i>
        {this.props.quote}
        <i className="font-weight-bolder font-italic" style={{"fontSize":"5em"}}>"</i>
      </div>
    );
  };
}

class Author extends React.Component {
  render() {
    return (
      <div id="author" className="font-italic font-weight-light" style={{"margin":"2%"}}>~ {this.props.author}</div>
    );
  };
}

class GenerateButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button id="new-quote" className="btn btn-secondary" style={{"marginRight":"2px"}} onClick={this.props.handleChange}>New Quote</button>
    );
  }
}

class TweetButton extends React.Component {
  constructor(props) {
    super(props);
    this.tweet = "https://twitter.com/intent/tweet?"+this.props.quote+" by "+this.props.author;
  }
  render() {
    return (
      <a href={this.tweet}>
        <button id="tweet-quote" className="btn btn-info" style={{"marginLeft":"2px"}}>Tweet Quote</button>
      </a>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.categories=[];
    this.generateCategories = this.generateCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.genearteQuote = this.genearteQuote.bind(this);
    this.state = {
      quote: "Dua-The most powerful weapon of a warrior",
      author: "Unknown"
    }
  }
  
  componentDidMount() {
    this.generateCategories();
  }

  generateCategories = () => {
    request('https://quotes.rest/qod/categories.json', { json: true }, (err, res, body) => {
      if(res.body.contents != undefined) {
        this.categories = Object.keys(res.body.contents.categories);
        console.log(this.categories);
      }
      else {
        console.error("ERROR OCCURED!!");
        window.alert("Error Occured!! API Limit Exceeded!!");
        console.log(res.body);
      }
    });
  }

  genearteQuote = () => {
    if(this.categories.length>0) {
      console.log("Yes Value");
      let cat = this.categories[Math.floor(Math.random()*this.categories.length)];
      let link = 'http://quotes.rest/qod.json?category='+cat;
      let promise = new Promise((resolve, reject) => {
        let quote_auth = null;
        request(link, { json: true }, (err, res, body) => {
          if(res.body.contents != undefined) {
            quote_auth = {quote: res.body.contents.quotes[0].quote, author:res.body.contents.quotes[0].author};
            resolve(quote_auth);
          }
          else {
            reject("Failed");
          }
        });
      });

      promise.then((quoteAuth) => {
        this.handleChange(quoteAuth);
      },(err) => {
        console.log(err);
        window.alert("Error Occured!! API Limit Exceeded!!");
      });
    }
  }
  
  handleChange = (quotes) => {
    this.setState({
      quote: quotes.quote,
      author: quotes.author
    });
  };

  render() {
    return (
      <div>
      <div style={{"marginTop":"10%"}}></div>
      <div className="container text-center jumbotron" id="quote-box">
          <Quote quote={this.state.quote}/>
          <Author author={this.state.author}/>
          <TweetButton quote={this.state.quote} author={this.state.author}/>&nbsp;
          <GenerateButton handleChange={this.genearteQuote}/>
      </div>
      </div>
    );
  };
}

export default App;
