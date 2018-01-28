import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Popover from 'react-popover';
import { read, create, update } from '../actions/category';
import CategoryEdit from '../components/CategoryEdit';

class Category extends Component {
  state = {
    open: {},
  }

  componentDidMount() {
    this.props.read();
  }

  setPopover(id, visible) {
    console.log('Setting popover!', id, visible);
    this.setState({
      open: {
        ...this.state.open,
        [id]: visible,
      },
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
                  <CategoryEdit
                    name={x.name}
                    color={x.color}
                    onSubmit={y => {
                      this.setPopover(x.id);
                      this.props.update({ ...y, id: x.id });
                    }}
                  />
                )}
                onOuterAction={() => this.setPopover(x.id)}
                place="below"
                appendTarget={document.querySelector('.grommetux-app')}
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
