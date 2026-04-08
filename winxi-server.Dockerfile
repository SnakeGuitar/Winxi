FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Set default port
ENV PORT=8000

CMD ["sh", "-c", "uvicorn winxi.main:app --host 0.0.0.0 --port ${PORT}"]
