
git add .
git commit -m $1
git stash 
git pull
git stash pop
git push