const fs = require("fs");

const envContent = `
NEXT_PUBLIC_API_URL=https://digital-cms.ge
DATABASE_URL=mysql://user:password@localhost:3306/mydb
`.trim();

fs.writeFileSync(".env.local", envContent);
console.log(".env.local file has been generated.");
