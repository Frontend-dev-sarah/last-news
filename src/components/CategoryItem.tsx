import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import Color from '../common/Color';
import { windowWidth } from '../common/Styles';
import { Category } from '../types/Category';

interface CategoryItemProps {
    category: Category,
    onPressCategory: (category: Category) => void
}

export const CategoryItem: React.FunctionComponent<CategoryItemProps> = ({
    category,
    onPressCategory
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onPressCategory(category)}
            style={styles.containerStyle}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={category.image}
                />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Color.primary,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3
    },
    image: {
        width: windowWidth / 5,
        height: windowWidth / 5,
        borderRadius: windowWidth / 10,
        borderWidth: 1,
        borderColor: Color.primary
    },
    categoryText: {
        color: Color.primary,
        fontSize: 14,
        textAlign: 'center'
    },
    containerStyle: {
        marginHorizontal: 5,
        justifyContent: 'center'
    }
})