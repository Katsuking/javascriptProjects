
FROM mongo:latest

# packagesのインストール
RUN apt update -y && apt upgrade -y && \
  apt install -y  curl

# localeの設定
ENV LANG ja_JP.UTF-8
ENV TZ=sia/Tokyo

# # ユーザー追加
# RUN useradd -ms /bin/bash ops && gpasswd -a ops sudo
# # RUN echo "ops:${PASSWORD}" | chpasswd
# RUN echo "ops:password" | chpasswd

# # ファイル
# WORKDIR /home/ops/tool
# COPY ./tool/* ./
# COPY ./.environment.local ./
# COPY ./db.local.cnf ./

# USER ops