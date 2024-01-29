# 基础镜像
FROM node:20

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package.json ./

# 安装项目依赖
# RUN npm install --registry https://registry.npm.taobao.org

# 复制项目文件到工作目录
# COPY . .

# 构建应用（对于生产环境）
# RUN npm run build

# 暴露端口
# EXPOSE 8080

# 设置启动命令
CMD ["tail", "-f", "/dev/null"]
