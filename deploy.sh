cd backend
git add .
git commit -m "minor edit to test server"
cd ..
git subtree push --prefix backend heroku main
git push heroku `git subtree split --prefix backend main`:main --force