import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import { read, create, update, deleteCategory } from '../actions/category';
import CategoryEdit from '../components/CategoryEdit';

function CategoryTile({ name, color, ...props }) {
  return (
    <Tile
      style={{
        backgroundColor: color,
        border: '1px solid rgba(0, 126, 255, 0.24)',
        borderRadius: 2,
        padding: '2px 5px',
      }}
      {...props}
    >
      {name}
    </Tile>
  );
}

const defaultCategory = {
  id: null,
  name: '',
  color: '#2ad2c9',
};

const newCategoryTile = {
  ...defaultCategory,
  name: 'New...',
  color: '#f5f5f5',
}

class Category extends Component {
  state = {
    ...defaultCategory,
  }

  componentDidMount() {
    this.props.read();
  }

  selectedCategory = ({ id, name, color }) => this.setState({
    id,
    name,
    color,
  });

  upsert = ({ name, color }) => {
    const method = this.state.id ? this.props.update : this.props.create;
    return method({
      name,
      color,
      id: this.state.id,
    }).then(({ payload: { id, name, color } }) => this.setState({
      id,
      name,
      color,
    }));
  }

  onDelete = (id) => {
    return this.props.deleteCategory(id)
      .then(() => this.selectedCategory(defaultCategory));
  }

  render() {
    const {
      categoryList,
    } = this.props;
    const {
      id,
      name,
      color,
    } = this.state;

    return (
      <Box>
        <Heading>Categories</Heading>
        <Box
          direction="row"
          align="start"
        >
          <CategoryEdit
            id={id}
            name={name}
            color={color}
            onSubmit={this.upsert}
            onDelete={this.onDelete}
          />
          <Tiles
            flush={false}
          >
            {categoryList.map(x => (
              <CategoryTile
                name={x.name}
                color={x.color}
                onClick={() => this.selectedCategory(x)}
                key={x.id}
              />
            ))}
            <CategoryTile
              name={newCategoryTile.name}
              color={newCategoryTile.color}
              onClick={() => this.selectedCategory(defaultCategory)}
            />
          </Tiles>
        </Box>
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
  deleteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
