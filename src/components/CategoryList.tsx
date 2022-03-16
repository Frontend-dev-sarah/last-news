import React from 'react';
import {
    ScrollView,
    StyleSheet
} from 'react-native';
import { CategoryItem } from './CategoryItem';
import { windowWidth } from '../common/Styles';
import { Category } from '../types/Category';

interface CategoryListProps {
    categories: Category[],
    onPressCategory: (category: Category) => void
}

export const CategoryList: React.FunctionComponent<CategoryListProps> = ({
    categories,
    onPressCategory
}) => {
    return (
        <ScrollView horizontal={true} style={styles.categoryContainer}>
            {categories.map((category) => {
                return (
                    <CategoryItem
                        key={category.name}
                        category={category}
                        onPressCategory={() => onPressCategory(category)}
                    />
                );
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        height: windowWidth / 3,
        marginVertical: 10
    }
})