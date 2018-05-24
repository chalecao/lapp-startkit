# lapp Start Kit
基于lapp框架的rollup打包开发的种子项目，你可以用这个项目做种子基础项目，这里配置好了打包工具和处理流程，你可以这样开始你的项目：
```
$ git clone -o lapp-startkit \
      -b master --single-branch \
      https://github.com/chalecao/lapp-startkit.git \
      <your-project-name>

$ cd <your-project-name>
$ git add .
$ git commit -m "first commit"
$ git remote add origin <your-project-git-url>
$ git push -u origin master
```

如果本项目更新，你可以这样更新你的项目，保持与种子项目的同步：
```
$ git checkout master
$ git fetch lapp-startkit
$ git merge lapp-startkit/master
$ npm install
```
