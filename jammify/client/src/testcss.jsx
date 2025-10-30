import React, { Component } from 'react';

class TestCSS extends Component {
    state = {  }
    render() { 
        return (
          <div>
            Test button <button>button</button>
            <br />
            Test checkbox Input <input type="checkbox" />
            <br />
            Test password Input <input type="password" />
            <br />
            Test text Input <input type="text" />
            <br />
            Test list item{" "}
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
            Test a tag <a href="https://www.google.com">Visit Google </a>
            <h1>This is h1</h1>
            <h2>This is h1</h2>
            <h3>This is h1</h3>
            Test Div
            <div>This is div</div>
          </div>
        );
    }
}
 
export default TestCSS;