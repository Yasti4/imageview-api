'use strict';

module.exports = `
  
  directive @auth(
    role: String = "admin"
  ) on OBJECT | FIELD_DEFINITION

`;
