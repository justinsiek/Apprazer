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

# Split categorical and numerical columns
categorical_columns = ['derived_race', 'derived_sex', 'occupancy_type', 'loan_purpose']
numerical_columns = ['loan_amount', 'income', 'interest_rate', 'property_value', 'debt_to_income_ratio']

# Initialize encoders
label_encoders = {}
X_encoded = X.copy()

# Encode categorical variables
for col in categorical_columns:
    label_encoders[col] = LabelEncoder()
    X_encoded[col] = label_encoders[col].fit_transform(X[col])

# Scale numerical variables
scaler = StandardScaler()
X_encoded[numerical_columns] = scaler.fit_transform(X_encoded[numerical_columns])

# Remap the target values to 0, 1, 2
label_encoder_y = LabelEncoder()
y = label_encoder_y.fit_transform(y)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

print("\nTraining set shape:", X_train.shape)
print("Test set shape:", X_test.shape)
print("\nSample of encoded features:")
print(X_encoded.head())
print("\nUnique values in target variable:", np.unique(y))

# After data cleaning but before model creation, add these debug prints:
print("\nUnique values in target variable:", np.unique(y))
print("Number of unique classes:", len(np.unique(y)))
print("Min value in action_taken:", y.min())
print("Max value in action_taken:", y.max())

# Import TabTransformer
from tensorflow import keras
from keras import layers

# Define model parameters
num_numerical_features = len(numerical_columns)
num_categorical_features = len(categorical_columns)
num_classes = len(np.unique(y))  # Fixed: using np.unique instead of .unique()

categorical_cardinalities = [
    len(label_encoders[col].classes_) for col in categorical_columns
]

print("Model configuration:")
print(f"Number of numerical features: {num_numerical_features}")
print(f"Number of categorical features: {num_categorical_features}")
print(f"Categorical cardinalities: {categorical_cardinalities}")
print(f"Number of classes: {num_classes}")

def create_tab_transformer(
    num_numerical_features,
    categorical_cardinalities,
    num_classes,
    d_model=32,
    num_heads=8,
    num_transformer_blocks=6,
    mlp_dropout=0.1,
    transformer_dropout=0.1
):
    # Numerical features
    numerical_inputs = keras.Input(shape=(num_numerical_features,))
    numerical_features = layers.BatchNormalization()(numerical_inputs)
    numerical_features = layers.Dense(d_model)(numerical_features)

    # Categorical features
    categorical_inputs = []
    categorical_embeddings = []
    
    for cardinality in categorical_cardinalities:
        input_layer = keras.Input(shape=(1,))
        categorical_inputs.append(input_layer)
        
        embedding_layer = layers.Embedding(
            input_dim=cardinality,
            output_dim=d_model
        )(input_layer)
        embedding_layer = layers.Reshape((-1, d_model))(embedding_layer)
        categorical_embeddings.append(embedding_layer)

    # Concatenate categorical embeddings
    if categorical_embeddings:
        categorical_features = layers.Concatenate(axis=1)(categorical_embeddings)
        
        # Add positional embeddings
        categorical_features = layers.LayerNormalization(epsilon=1e-6)(categorical_features)
    
        # Apply Transformer blocks
        for _ in range(num_transformer_blocks):
            # Multi-head self attention
            attention_output = layers.MultiHeadAttention(
                num_heads=num_heads,
                key_dim=d_model,
                dropout=transformer_dropout
            )(categorical_features, categorical_features)
            
            # Skip connection 1
            x1 = layers.Add()([attention_output, categorical_features])
            x1 = layers.LayerNormalization(epsilon=1e-6)(x1)
            
            # Feed-forward network
            x2 = layers.Dense(d_model * 4, activation="relu")(x1)
            x2 = layers.Dropout(mlp_dropout)(x2)
            x2 = layers.Dense(d_model)(x2)
            
            # Skip connection 2
            categorical_features = layers.Add()([x2, x1])
            categorical_features = layers.LayerNormalization(epsilon=1e-6)(categorical_features)
        
        # Pool categorical features
        categorical_features = layers.GlobalAveragePooling1D()(categorical_features)

    # Combine features
    features = layers.Concatenate(axis=1)([
        numerical_features,
        categorical_features
    ])

    # Final MLP layers
    features = layers.Dense(64, activation="relu")(features)
    features = layers.Dropout(mlp_dropout)(features)
    features = layers.Dense(32, activation="relu")(features)
    features = layers.Dropout(mlp_dropout)(features)
    
    # Output layer
    output = layers.Dense(num_classes, activation="softmax")(features)

    # Create model
    model = keras.Model(
        inputs=[numerical_inputs] + categorical_inputs,
        outputs=output
    )
    
    return model

# Create the model
model = create_tab_transformer(
    num_numerical_features=num_numerical_features,
    categorical_cardinalities=categorical_cardinalities,
    num_classes=num_classes
)

print("\nModel Summary:")
model.summary()

# Prepare data in the format needed for the model
X_train_numerical = X_train[numerical_columns].values
X_test_numerical = X_test[numerical_columns].values

X_train_categorical = [X_train[col].values.reshape(-1, 1) for col in categorical_columns]
X_test_categorical = [X_test[col].values.reshape(-1, 1) for col in categorical_columns]

# Convert target to one-hot encoded format
y_train_encoded = keras.utils.to_categorical(y_train)
y_test_encoded = keras.utils.to_categorical(y_test)

print("\nUnique values in encoded target:", np.unique(y))
print("Shape of encoded training target:", y_train_encoded.shape)
print("Shape of encoded test target:", y_test_encoded.shape)

# Compile the model
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Training parameters
batch_size = 256
epochs = 10

# Train the model
history = model.fit(
    [X_train_numerical] + X_train_categorical,
    y_train_encoded,
    validation_data=([X_test_numerical] + X_test_categorical, y_test_encoded),
    batch_size=batch_size,
    epochs=epochs,
    verbose=1
)

# Print final evaluation
test_loss, test_accuracy = model.evaluate(
    [X_test_numerical] + X_test_categorical,
    y_test_encoded,
    verbose=0
)
print(f"\nTest accuracy: {test_accuracy:.4f}")

# Plot training history
import matplotlib.pyplot as plt

plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()

plt.tight_layout()
plt.show()
