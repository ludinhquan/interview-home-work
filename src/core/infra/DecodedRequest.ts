
import express from 'express';
import { JWTClaims } from "@/modules/user/domain/jwt";

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims
}