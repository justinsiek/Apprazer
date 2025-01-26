import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

def train_model():
    print("Starting model training process...")
    
    # Read the CSV file
    print("Reading CSV file...")
    df = pd.read_csv('data.csv')
    print(f"Initial dataset shape: {df.shape}")
    
    # Take a sample of the data
    print("Taking sample of data...")
    df = df.sample(frac=0.02, random_state=42)
    
    # Filter out outliers and restrict ranges
    print("Filtering data ranges...")
    df = df[
        (df['income'] < 500) &
        (df['property_value'].between(200000, 500000)) &
        (df['loan_amount'].between(200000, 500000))
    ]
    
    # Add income to loan amount ratio
    df['income_loan_ratio'] = df['income'] / df['loan_amount']
    
    print(f"Dataset shape after filtering: {df.shape}")

    print("One-Hot Encoding categorical columns...")
    # One-Hot Encode categorical columns (removed demographic features)
    df_encoded = pd.get_dummies(
        df, 
        columns=['loan_purpose'], 
        drop_first=True
    )
    print(f"Shape after one-hot encoding: {df_encoded.shape}")

    # Separate features and target
    print("Separating features and target...")
    X = df_encoded.drop(['action_taken', 'derived_race', 'derived_sex', 'occupancy_type', 'applicant_age'], axis=1)
    y = df_encoded['action_taken']
    print(f"Number of features: {X.shape[1]}")
    print(f"Distribution of target variable:\n{y.value_counts(normalize=True)}")

    # Split the data
    print("\nSplitting into train and test sets...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Training set size: {X_train.shape[0]}")
    print(f"Test set size: {X_test.shape[0]}")

    # Train the model
    print("\nTraining Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=500,
        min_samples_split=2,
        min_samples_leaf=1,
        max_features=None,
        max_depth=10,
        bootstrap=True,
        random_state=42
    )
    model.fit(X_train, y_train)
    print("Model training complete!")

    # Evaluate model
    print("\nEvaluating model performance...")
    # Training accuracy
    y_train_pred = model.predict(X_train)
    train_accuracy = accuracy_score(y_train, y_train_pred)
    print(f"Training Accuracy: {train_accuracy:.4f}")

    # Test accuracy
    y_test_pred = model.predict(X_test)
    test_accuracy = accuracy_score(y_test, y_test_pred)
    print(f"Test Accuracy: {test_accuracy:.4f}")

    # Save the model and feature columns
    print("\nSaving model and feature columns...")
    joblib.dump(model, 'loan_model.joblib')
    joblib.dump(X.columns.tolist(), 'feature_columns.joblib')
    print("Model and features saved successfully!")

def prepare_features(loan_data):
    """Prepare a single loan application's features for prediction"""
    print("\nPreparing features for prediction...")
    # Create a DataFrame with the input data
    df = pd.DataFrame([{
        'loan_amount': loan_data['loan_amount'],
        'income': loan_data['income'],
        'property_value': loan_data['property_value'],
        'debt_to_income_ratio': loan_data['debt_to_income_ratio'],
        'loan_purpose': loan_data['loan_purpose'],
        'income_loan_ratio': loan_data['income'] / loan_data['loan_amount']
    }])
    print("Input data converted to DataFrame")

    # One-hot encode categorical variables
    print("One-hot encoding categorical variables...")
    df_encoded = pd.get_dummies(
        df,
        columns=['loan_purpose'],
        drop_first=True
    )

    # Load the expected feature columns
    print("Loading feature columns and aligning data...")
    feature_columns = joblib.load('feature_columns.joblib')

    # Add missing columns with 0s
    for col in feature_columns:
        if col not in df_encoded.columns:
            df_encoded[col] = 0

    # Ensure columns are in the same order as during training
    df_encoded = df_encoded[feature_columns]
    print("Features prepared successfully!")
    return df_encoded

def predict_loan(loan_data):
    """Predict loan approval probability for a single application"""
    print("\nStarting loan prediction...")
    # Load the model
    print("Loading model...")
    model = joblib.load('loan_model.joblib')

    # Prepare features
    X = prepare_features(loan_data)

    # Get prediction probability
    print("Making prediction...")
    prob = model.predict_proba(X)[0]
    
    # Return probability of approval (class 1)
    approval_prob = float(prob[1])
    print(f"Prediction complete! Approval probability: {approval_prob:.2%}")
    return approval_prob

if __name__ == "__main__":
    print("Training model...")
    #train_model()
    print("Model training complete.")
    
    # Test prediction with sample data
    print("\nTesting prediction with sample data...")
    sample_loan = {
        'loan_amount': 300000.0,
        'income': 100.0,
        'property_value': 350000.0,
        'debt_to_income_ratio': 0.05,
        'loan_purpose': 1
    }
    
    approval_probability = predict_loan(sample_loan)
    print(f"\nSample Loan Details:")
    print(f"Loan Amount: ${sample_loan['loan_amount']:,.2f}")
    print(f"Income: ${sample_loan['income']:,.2f}")
    print(f"Property Value: ${sample_loan['property_value']:,.2f}")
    print(f"Debt-to-Income Ratio: {sample_loan['debt_to_income_ratio']:.2%}")
    print(f"Income to Loan Ratio: {(sample_loan['income'] / sample_loan['loan_amount']):.3%}")
    print(f"Final Approval Probability: {approval_probability:.2%}")
