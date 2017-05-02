import React, { Component } from 'react';
import { tap, compose, curry } from 'ramda';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { CardActions } from 'material-ui/Card';

const getValue = (e, value) => value;
const toObject = curry((dim, value) => ({ [dim]: value }));
const toWidth = compose(toObject('width'), getValue);
const toHeight = compose(toObject('height'), getValue);

class RendererSetup extends Component {
  static defaultProps = {
    onChange: () => {},
    onCreate: () => {},
    widthSlider: {
      max: 1600,
      min: 400,
      step: 5
    },
    heightSlider: {
      max: 1200,
      min: 300,
      step: 5
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      width: props.widthSlider.min,
      height: props.heightSlider.min
    };
  }

  setDims = (dims) => {
    this.setState(dims);
  }

  render() {
    const { onChange, widthSlider, heightSlider, onCreate } = this.props;
    return(
      <CardActions>
        <TextField
          id={'renderer-width'}
          defaultValue={widthSlider.min}
          floatingLabelText='Width'
          onChange={compose(onChange, tap(this.setDims), toWidth)}
        />
        <TextField
          id={'renderer-height'}
          defaultValue={widthSlider.min}
          floatingLabelText='Height'
          onChange={compose(onChange, tap(this.setDims), toHeight)}
        />
        <RaisedButton label='Resize' onTouchTap={onCreate} />
      </CardActions>
    );
  }
}

module.exports = RendererSetup;

