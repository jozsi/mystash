import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import { ChromePicker } from 'react-color';
import Popover from 'react-popover';
import { read, create, update } from '../actions/category';

class Category extends Component {
  state = {
    open: {},
  }

  componentDidMount() {
    this.props.read();
  }

  setPopover(id, visible) {
    this.setState({
      open: {
        ...this.state.open,
        [id]: visible,
      },
    });
  }

  updateColor(x, color) {
    this.props.update({
      ...x,
      color,
    });
  }

  render() {
    const { categoryList } = this.props;

    return (
      <Box>
        <Heading>Categories</Heading>
        <Label>Click on a category tag to edit it</Label>
        <Tiles
          flush={false}
        >
          {categoryList.map(x => (
            <Tile
              style={{
                backgroundColor: x.color,
                border: '1px solid rgba(0, 126, 255, 0.24)',
                borderRadius: 2,
                padding: '2px 5px',
              }}
              key={x.id}
              onClick={() => this.setPopover(x.id, true)}
            >
              <Popover
                isOpen={this.state.open[x.id]}
                children={<div>{x.name}</div>}
                body={(
                  <ChromePicker
                    color={x.color}
                    onChangeComplete={({ hex }) => this.updateColor(x, hex)}
                  />
                )}
                onOuterAction={() => this.setPopover(x.id)}
                place="below"
              />
            </Tile>
          ))}
        </Tiles>
      </Box>
    );
  }
}

Category.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
  })),
  read: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = ({ category }) => ({
  categoryList: category.list,
});

const mapDispatchToProps = {
  read,
  create,
  update,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
