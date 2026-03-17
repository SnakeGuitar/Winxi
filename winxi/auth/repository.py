from sqlalchemy.orm import Session
from winxi.auth.models import Token

def create_token(db: Session, token_data: dict):
    db_token = Token(**token_data)
    db.add(db_token)
    db.commit()
    db.refresh(db_token)
    return db_token

def get_valid_refresh_token(db: Session, token: str):
    return db.query(Token).filter(Token.refresh_token == token, Token.is_revoked == False).first()

def revoke_all_user_tokens(db: Session, user_id: int):
    db.query(Token).filter(Token.user_id == user_id, Token.is_revoked == False).update({"is_revoked": True})
    db.commit()
    return True
