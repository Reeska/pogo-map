<template>
  <div class="details">
    <recipe :data="recipe"/><br/>
    <h4>Ingrédients</h4>
    <div class="ingredients" v-for="ingredient in recipe.ingredients">
      {{ingredient.label}}
    </div>
  </div>
</template>

<script>
  import Recipe from './Recipe.vue'
  import recipesService from '../services/recipes-services'

  export default {
    props: ['uid'],
    data() {
      return {
        recipe: ''
      }
    },
    created() {
      recipesService.getRecipe(this.uid).then(recipe => {
        this.recipe = recipe;
      });
    },
    components: {Recipe}
  }
</script>

<style scoped lang="scss">
  .details {
    position: relative;

    .img-big {
      text-align: center;
      position: absolute;
      z-index: 1;
      opacity: 0.3;
    }

    .ingredients {
      padding: 10px;

      h4 {
        margin-top: 0;
      }
    }
  }
</style>
