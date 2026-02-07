"""Configuration management using Pydantic BaseSettings."""
from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Database
    database_url: str

    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000

    # JWT Authentication
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 15  # Short-lived access tokens
    jwt_refresh_expiration_hours: int = 168  # Longer refresh tokens
    jwt_expiration_hours: int = 168  # For compatibility with .env
    bcrypt_rounds: int = 12

    # Security
    access_token_cookie_name: str = "access_token"
    refresh_token_cookie_name: str = "refresh_token"
    csrf_token_header_name: str = "x-csrf-token"
    csrf_secret: str = ""

    # Rate Limiting
    rate_limit_requests: int = 100
    rate_limit_window: int = 3600  # in seconds

    # Debug
    debug: bool = False

    # Logging
    log_level: str = "info"

    # Gemini Configuration (uses OpenAI-compatible API)
    gemini_api_key: str = ""  # REQUIRED - set in .env file for chat functionality
    gemini_model: str = "gemini-flash-latest"  # Free Gemini model
    gemini_base_url: str = "https://generativelanguage.googleapis.com/v1beta/openai/"
    chat_max_tokens: int = 2000
    chat_timeout_seconds: int = 30
    chat_rate_limit: int = 10

    # MCP Server
    mcp_base_url: str = "http://localhost:8001"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False
    }


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


# Global settings instance
settings = get_settings()
