import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import styles from './HelpCenterStyles';

export default function HelpCenterScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showCategories, setShowCategories] = useState(false);

    const categories = [
        'Bank Related Issues',
        'Money Transfer Issues',
        'Wallet Related Issues',
        'Market Related Queries',
        'Profile Related Queries',
        'KYC & Verification Issues',
        'Deposit & Withdrawal Issues',
        'Transaction Issues', 
        'Login & Security Issues',
        'Rewards & Referral Queries',
        'Technical Support',
        'General Support',
    ];

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#2b007a' }}
            edges={['top', 'bottom']}
        >
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={26} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        Help Center
                    </Text>

                    <View style={{ width: 26 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        paddingBottom: 100,
                    }}
                >
                    <View style={styles.dropdownHeader}>
                        <Text style={styles.sectionTitle}>
                            Select Issue Category
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.selectedCategoryBox}
                        onPress={() =>
                            setShowCategories(!showCategories)
                        }
                    >
                        <Text style={styles.selectedCategoryText}>
                            {selectedCategory || 'Choose a category'}
                        </Text>

                        <Icon
                            name={
                                showCategories
                                    ? 'chevron-up'
                                    : 'chevron-down'
                            }
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    {showCategories &&
                        categories.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.categoryCard,
                                    selectedCategory === item &&
                                    styles.selectedCard,
                                ]}
                                onPress={() => {
                                    setSelectedCategory(item);
                                    setShowCategories(false);
                                }}
                            >
                                <Text style={styles.categoryText}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}

                    <Text style={styles.sectionTitle}>
                        Issue Title
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter issue title"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.sectionTitle}>
                        Describe Your Issue
                    </Text>

                    <TextInput
                        style={styles.textArea}
                        multiline
                        numberOfLines={5}
                        placeholder="Explain your issue in detail..."
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.sectionTitle}>
                        Upload Evidence
                    </Text>

                    <TouchableOpacity
                        style={styles.uploadButton}
                    >
                        <Icon
                            name="paperclip"
                            size={18}
                            color="#fff"
                        />

                        <Text style={styles.uploadText}>
                            Attach Image / PDF
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>
                        Additional Notes
                    </Text>

                    <TextInput
                        style={styles.notesInput}
                        multiline
                        numberOfLines={4}
                        placeholder="Enter additional notes..."
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                    >
                        <Text style={styles.submitText}>
                            Submit Query
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}