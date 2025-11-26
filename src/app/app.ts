import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly primeng = inject(PrimeNG);

  protected title = 'stock-control';

  ngOnInit() {
    this.primeng.ripple.set(true);
    this.primeng.setTranslation({
      startsWith: 'Começa com',
      contains: 'Contém',
      notContains: 'Não contém',
      endsWith: 'Termina com',
      equals: 'Igual',
      notEquals: 'Diferente',
      noFilter: 'Sem filtro',
      lt: 'Menor que',
      lte: 'Menor ou igual a',
      gt: 'Maior que',
      gte: 'Maior ou igual a',
      dateIs: 'A data é',
      dateIsNot: 'A data não é',
      dateBefore: 'Antes da data',
      dateAfter: 'Depois da data',
      clear: 'Limpar',
      apply: 'Aplicar',
      matchAll: 'Combinar tudo',
      matchAny: 'Combinar qualquer',
      addRule: 'Adicionar regra',
      removeRule: 'Remover regra',
      accept: 'Sim',
      reject: 'Não',
      choose: 'Escolher',
      upload: 'Enviar',
      cancel: 'Cancelar',
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      monthNamesShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
      ],
      today: 'Hoje',
      weekHeader: 'Sem',
      firstDayOfWeek: 0,
      dateFormat: 'dd/mm/yy',
      weak: 'Fraca',
      medium: 'Média',
      strong: 'Forte',
      passwordPrompt: 'Digite uma senha',
      emptyMessage: 'Nenhum resultado encontrado',
      emptyFilterMessage: 'Nenhum resultado encontrado'
    });
  }
}
