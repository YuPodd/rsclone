import Sortable from 'sortablejs';

export function addAbilityToMoveItems(){
  let listContent = document.getElementsByClassName('list__content');
  for (let elem of listContent) {
      Sortable.create(elem, {
          animation: 500,
          group: {
            name: "shared",
            put: true,
            pull: true,
          },
          sort: true
        });  
  }
}

    


