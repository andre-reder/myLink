# myLink
My first project for my job, using VanillaJS with Bootstrap, it calculates a route using public transport from home to company, with the total cost.

Este foi meu primeiro projeto criado para minha atual empresa, foi feito em VanillaJS, utilizando o bootstrap, e consumindo REST API's próprias da empresa. Seu objetivo é resgatar o endereço residencial fornecido pelo usuário que o acessa, e calcular sua rota e vale transporte de sua casa até seu trabalho, exibindo uma tela com seu resultado e opções de aceitar, solicitar algum ajuste na rota, ou informar que não utilizará o benefício

Antes de abrir a página inicial, onde o usuário insere seus dados, é realizada uma validação através do consumo de uma API para verificar se a empresa a consumir o serviço está habilitada em sistema. Após passar na validação, o funcionário insere seu CPF, neste campo está contida uma máscara de formatação, e uma validação de CPF, caso o usuário digite um CPF inválido, um alerta é exibido e o valor digitado no campo apagado, o mesmo ocorre no campo do e-mail. O usuário passa para a próxima etapa apenas se todos os campos estiverem sido preenchidos de maneira válida.

Na etapa seguinte o usuário informa seu endereço, após preencher o CEP, a partir do consumo da API dos correios os demais campos do endereço são preenchidos automaticamente. Caso o CEP informado seja inválido um alerta é exibido e o valor digitado no campo apagado. Este campo possui uma máscara de formatação de CEP.

A última etapa é onde o usuário seleciona em qual filial de sua empresa ele trabalha, a lista é exibida a partir do consumo de uma API da empresa. Ao selecionar a filial na lista, o endereço da mesma é exibido logo abaixo do campo.

Por fim o usuário clica em roteirizar, uma tela de aguarde é exibida informando o status do processamento dos dados, o redirecionamento é feito de acordo com o status do processamento, caso tenha ocorrido com sucesso, a tela de resultado é exibida com um quadro descrevendo a rota e valores, com o mapa no plano de fundo, cards no cabeçalho com informações gerais da rota, e os botões com as opções de aceitar, solicitar ajuste, ou recusar o benefício.

Devido à dependência das API's próprias da empresa para o funcionamento, não é possível fornecer uma demo, mas um vídeo demonstrativo do funcionamento do projeto pode ser visto abaixo

https://user-images.githubusercontent.com/105744180/178519181-a379160f-1f9a-4ce2-87b3-35c515f3c349.mp4

