# Use a Python base image
FROM python

# Set the working directory in the container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the port Flask runs on
EXPOSE 8080

# Command to run the Flask app
CMD ["python", "app.py"]
