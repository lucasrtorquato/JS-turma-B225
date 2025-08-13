# 1️⃣ Criando o Repositório Local
mkdir curso-dev-js
cd curso-dev-js
git init
git config user.name "Seu Nome"
git config user.email "seuemail@example.com"

# 2️⃣ Criando e Versionando Arquivos
echo "# Curso Desenvolvimento JavaScript" > README.md
echo "Informações relevantes sobre JavaScript" > pesquisa.txt
mkdir -p atividades-praticas
mkdir -p exercicios-individuais/cmd
# Copiar a atividade CMD para exercicios-individuais/cmd/atividade-cmd.txt
git add .
git commit -m "Commit inicial: estrutura do repositório e arquivos base"

# 3️⃣ Criando uma Branch e Continuando
git checkout -b melhorias-estrutura
# Editar README.md e pesquisa.txt conforme indicado
git add README.md pesquisa.txt
git commit -m "Melhorias: explicação da estrutura e mais conteúdo na pesquisa"
git checkout main
git merge melhorias-estrutura

# 4️⃣ Conectando ao GitHub e Enviando
# Criar repositório no GitHub manualmente chamado curso-dev-js
git remote add origin https://github.com/SEU_USUARIO/curso-dev-js.git
git branch -M main
git push -u origin main
git push origin melhorias-estrutura

# 5️⃣ Clonando e Finalizando
cd ..
rm -rf curso-dev-js
git clone https://github.com/SEU_USUARIO/curso-dev-js.git
cd curso-dev-js
# Editar pesquisa.txt e adicionar seu nome completo
git add pesquisa.txt
git commit -m "Adicionado nome completo ao pesquisa.txt"
git push origin main

# Criar arquivo lista-comandos.txt com todos os comandos usados
mkdir -p exercicios-individuais/git_github
# Dentro de lista-comandos.txt colocar os comandos acima
git add exercicios-individuais/git_github/lista-comandos.txt
git commit -m "Adicionado lista de comandos Git utilizados"
git push origin main
