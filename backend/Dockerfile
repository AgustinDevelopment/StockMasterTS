# Usa una imagen base de Node.js
FROM node:18

# Crea y define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
RUN npm install

RUN useradd -ms /bin/bash nodejs

USER nodejs

# Copia el resto de los archivos del proyecto al contenedor
COPY . .


# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 4000

# Define el comando para ejecutar la aplicación
CMD ["npx", "ts-node", "src/index.ts"]
