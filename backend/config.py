from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    typless_api_key: str
    typless_api_root: str
    db_url: str
    model_config = SettingsConfigDict(env_file=".env")
