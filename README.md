# Winner of Irvine Hacks 2025 - Best Use of AI in Real Estate

# Inspiration
Whenever you watch the news, it's hard to avoid the constant discussion of rising home prices and how markets are fully shifted away from first-time home buyers relying on classic mortgages. Most sellers are looking for quick offers and follow-through that highly favors those with cash, but what if we could create a new edge for lenders and borrowers?

Apprazer cuts the often multi-day antiquated process of deciding loan approval. For the lending organization, less time can be wasted on interviews and reading extremely weak applications. The bank can see a full portfolio of current applications and the applicants with a picture of the key incites related both to specific applicants and the overall lending portfolio. For buyers, the positive effects are much easier to see: streamlined UX made for easy application and upload of documents and the ability to not only send in offers faster but get approved for the loans helping get an edge in a market trying to edge you out.

# What it does
Apprazer screens the process of approving loans for both the asker and the bank, cutting the processing time of documents from days to seconds. We do this through our model for predicting the likelihood of loan approval through all national data and an AI document parser that makes all application forms easy to submit and get approved.

# How we built it
Apprazer is built on an industry-standard tech stack, combining the power of a Next.js frontend with a Flask REST API Python backend. The frontend, developed with React and styled using Tailwind CSS, features a robust interface focused on practicality while remaining sleek and attractive to create an engaging user experience.

The application processes loan documents through an advanced OCR system, using PyTesseract and OpenCV. Since the papers follow a standardized format, we implemented a template-based extraction system that pinpointed specific areas on the document to screen, greatly improving the accuracy and speed of the data extraction compared to more general OCR solutions. The extracted data is then processed through our random forest classifier model, which was trained and fine-tuned on over 1 million data points from the HMDA dataset.

Our model incorporates key financial indicators, including loan amount, income, property value, and debt-to-income ratio, along with demographic features, to ensure fair lending practices. Through extensive hyperparameter tuning and cross-validation, we achieved a robust testing accuracy of 84%, significantly outperforming traditional rule-based lending decision systems. The random forest architecture was specifically chosen for its ability to handle the complex, non-linear relationships in lending data while maintaining transparency in its decision-making process - a crucial requirement for regulatory compliance in the financial sector.

# Challenges we ran into
From the start, we ran into challenges trying to find ideas that were both realistic and original. Inspiration came in the form of a discussion on real estate and proptech’s meanings and applications. We looked at how to use AI to support existing processes. We have never bought or home or anything close, so finding the right terminology to search for datasets and understand our goals was a battle.

We then struggled to find a dataset that properly encapsulated the breadth of mortgages. After much effort, we struck gold: a nationwide dataset with millions of points. The final and strongest challenge of all was training the model to appraise the cornerstone of our project. We struggled to clean 11 million data points, and using them all would have been impossible. There was likely an innate order.

We attempted to drop the columns that were not relevant and continue with the data. We felt this would be enough to get a strong prediction using a tab transformer model. We found the model was approving the loan every time because it found it would succeed about 76% of the time. We were now tasked with the unclean intricate data and a model that was failing us. We decided to clean the data further through selecting a random sample along with aggressively filtering out null data. We decided that the model was also in need of a change with the help of the amazing mentors and used a random forest classifier and SVM.

Now, with both sides, data and model, we pushed forward with only minor changes such as adjusting hyperparameters and shifting the data. We found the right model in a random forest classifier. The project was a continuous balancing act, but we stayed focused and flexible and powered through.

# Accomplishments that we're proud of
A common theme of this was testing our perseverance. We grew so much in the processes of data science and machine learning. We used data sets larger than we ever had and were forced to quickly decide out of hundreds of millions of numbers which were the key to unlocking the project. We went from being incredibly unfamiliar in machine learning and working with large data sets to creating a strong model with a very high accuracy and successfully cleaning an incredibly extensive low-quality data set.

Most of all, we are proud of the connections that grew between us and growing in ideas that seemed unrelated. Learning to work together and create a product that could genuinely help many people's lives and be the reason new homeowners can have an edge.

# What we learned
We learned a lot about the hidden processes of bank loan approvals and the interesting patterns present across millions of data points in mortgage loans. Combining machine learning and data analysis techniques, we were able to grasp a strong foundation for training models on raw data, a skill that is necessary for the interpretation of large data sets. In addition, we learned interesting techniques in niche areas that forced a new understanding of technologies we had not explored prior. For example, we practiced the consistent parsing of PDF documents through an intuitive technique of…

# What's next for Apprazer
We are excited to have these trained models that can provide valuable insights and bring a substantial improvement in the loan approval process. However, we all believe that having access to better data would allow us to build a more robust product that can enable banks to better serve their clients.
