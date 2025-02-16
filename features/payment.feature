Funcionalidade: Checkout de Pagamento

  Cenário: Recuperar um pedido de checkout com sucesso
    Dado que existe um pedido de checkout com o ID do pedido 12345
    Quando eu solicito o checkout para o ID do pedido 12345
    Então o status da resposta deve ser 200
    Então a resposta deve conter os detalhes do checkout

  Cenário: Pedido de checkout não encontrado
    Dado que não existe um pedido de checkout com o ID do pedido 99999
    Quando eu solicito o checkout para o ID do pedido 99999
    Então o status da resposta deve ser 500
    Então a resposta deve conter uma mensagem de erro
