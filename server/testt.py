import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
import numpy as np

# Read the CSV file
file_path = 'year_2023.csv'
df = pd.read_csv(file_path, nrows=200000)  # Only read first 1000 rows

# Let's start with a subset of columns for initial testing
selected_columns = [
    'loan_amount',
    'income',
    'interest_rate',
    'property_value',
    'debt_to_income_ratio',  # numerical features
    'derived_race',
    'derived_sex',
    'occupancy_type',
    'loan_purpose',  # categorical features
    'action_taken'   # target variable
]

df = df[selected_columns]

# Print basic info about the loaded data
print("Dataset shape:", df.shape)
print("\nMissing values:")
print(df.isnull().sum())

# Handle missing values and non-numeric values in numerical columns
for col in ['loan_amount', 'income', 'interest_rate', 'property_value', 'debt_to_income_ratio']:
    # Convert non-numeric values to NaN
    df[col] = pd.to_numeric(df[col], errors='coerce')

# Drop rows with any NaN values
df = df.dropna()
print("Dataset shape after cleaning:", df.shape)

# After cleaning but before encoding, add these prints:
print("\nDistribution of action_taken values:")
print(df['action_taken'].value_counts())
print("\nPercentage distribution:")
print(df['action_taken'].value_counts(normalize=True) * 100)

# Separate features and target
X = df.drop('action_taken', axis=1)
y = df['action_taken']