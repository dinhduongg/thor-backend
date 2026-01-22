import { Category } from '@/modules/categories/entities/category.entity'
import { CategoryTranslation } from '@/modules/category-translations/entities/category-translations.entity'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

export class CategorySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // Xóa tất cả data trước khi seed
    await em.nativeDelete(CategoryTranslation, {})
    await em.nativeDelete(Category, {})

    // Parent categories
    const dogs = em.create(Category, {
      sorted: 1,
      level: 1,
      icon: 'dog',
    })

    const cats = em.create(Category, {
      sorted: 2,
      level: 1,
      icon: 'cat',
    })

    const birds = em.create(Category, {
      sorted: 3,
      level: 1,
      icon: 'dove',
    })

    const fish = em.create(Category, {
      sorted: 4,
      level: 1,
      icon: 'fish',
    })

    // Child categories for Dogs
    const dogFood = em.create(Category, {
      parent: dogs,
      sorted: 1,
      level: 2,
      icon: 'bone',
    })

    const dogToys = em.create(Category, {
      parent: dogs,
      sorted: 2,
      level: 2,
      icon: 'ball',
    })

    const dogAccessories = em.create(Category, {
      parent: dogs,
      sorted: 3,
      level: 2,
      icon: 'collar',
    })

    // Child categories for Cats
    const catFood = em.create(Category, {
      parent: cats,
      sorted: 1,
      level: 2,
      icon: 'fish',
    })

    const catToys = em.create(Category, {
      parent: cats,
      sorted: 2,
      level: 2,
      icon: 'paw',
    })

    const catAccessories = em.create(Category, {
      parent: cats,
      sorted: 3,
      level: 2,
      icon: 'home',
    })

    // Child categories for Birds
    const birdFood = em.create(Category, {
      parent: birds,
      sorted: 1,
      level: 2,
      icon: 'seedling',
    })

    const birdCages = em.create(Category, {
      parent: birds,
      sorted: 2,
      level: 2,
      icon: 'cage',
    })

    // Child categories for Fish
    const fishFood = em.create(Category, {
      parent: fish,
      sorted: 1,
      level: 2,
      icon: 'food',
    })

    const aquariums = em.create(Category, {
      parent: fish,
      sorted: 2,
      level: 2,
      icon: 'aquarium',
    })

    // Persist all categories first
    await em.persistAndFlush([dogs, cats, birds, fish, dogFood, dogToys, dogAccessories, catFood, catToys, catAccessories, birdFood, birdCages, fishFood, aquariums])

    // Translations for Dogs
    em.create(CategoryTranslation, {
      category: dogs,
      language: 'vi',
      name: 'Chó',
      description: 'Sản phẩm dành cho chó cưng',
      meta_title: 'Chó - Thú cưng',
      meta_description: 'Mua sắm đồ dùng và thức ăn cho chó cưng',
    })

    em.create(CategoryTranslation, {
      category: dogs,
      language: 'en',
      name: 'Dogs',
      description: 'Products for dogs',
      meta_title: 'Dogs - Pets',
      meta_description: 'Shop dog supplies and food',
    })

    // Translations for Cats
    em.create(CategoryTranslation, {
      category: cats,
      language: 'vi',
      name: 'Mèo',
      description: 'Sản phẩm dành cho mèo cưng',
      meta_title: 'Mèo - Thú cưng',
      meta_description: 'Mua sắm đồ dùng và thức ăn cho mèo cưng',
    })

    em.create(CategoryTranslation, {
      category: cats,
      language: 'en',
      name: 'Cats',
      description: 'Products for cats',
      meta_title: 'Cats - Pets',
      meta_description: 'Shop cat supplies and food',
    })

    // Translations for Birds
    em.create(CategoryTranslation, {
      category: birds,
      language: 'vi',
      name: 'Chim',
      description: 'Sản phẩm dành cho chim cảnh',
      meta_title: 'Chim cảnh',
      meta_description: 'Mua sắm đồ dùng và thức ăn cho chim cảnh',
    })

    em.create(CategoryTranslation, {
      category: birds,
      language: 'en',
      name: 'Birds',
      description: 'Products for birds',
      meta_title: 'Birds',
      meta_description: 'Shop bird supplies and food',
    })

    // Translations for Fish
    em.create(CategoryTranslation, {
      category: fish,
      language: 'vi',
      name: 'Cá cảnh',
      description: 'Sản phẩm dành cho cá cảnh',
      meta_title: 'Cá cảnh',
      meta_description: 'Mua sắm bể cá và đồ dùng cho cá cảnh',
    })

    em.create(CategoryTranslation, {
      category: fish,
      language: 'en',
      name: 'Fish',
      description: 'Products for fish',
      meta_title: 'Fish',
      meta_description: 'Shop aquariums and fish supplies',
    })

    // Translations for Dog Food
    em.create(CategoryTranslation, {
      category: dogFood,
      language: 'vi',
      name: 'Thức ăn cho chó',
      description: 'Thức ăn dinh dưỡng cho chó',
      meta_title: 'Thức ăn cho chó',
      meta_description: 'Thức ăn chất lượng cao cho chó cưng',
    })

    em.create(CategoryTranslation, {
      category: dogFood,
      language: 'en',
      name: 'Dog Food',
      description: 'Nutritious food for dogs',
      meta_title: 'Dog Food',
      meta_description: 'High quality dog food',
    })

    // Translations for Dog Toys
    em.create(CategoryTranslation, {
      category: dogToys,
      language: 'vi',
      name: 'Đồ chơi cho chó',
      description: 'Đồ chơi vui nhộn cho chó',
      meta_title: 'Đồ chơi cho chó',
      meta_description: 'Đồ chơi giúp chó vui vẻ và khỏe mạnh',
    })

    em.create(CategoryTranslation, {
      category: dogToys,
      language: 'en',
      name: 'Dog Toys',
      description: 'Fun toys for dogs',
      meta_title: 'Dog Toys',
      meta_description: 'Toys to keep your dog happy and healthy',
    })

    // Translations for Dog Accessories
    em.create(CategoryTranslation, {
      category: dogAccessories,
      language: 'vi',
      name: 'Phụ kiện cho chó',
      description: 'Vòng cổ, dây dắt, quần áo cho chó',
      meta_title: 'Phụ kiện cho chó',
      meta_description: 'Phụ kiện thời trang và tiện ích cho chó',
    })

    em.create(CategoryTranslation, {
      category: dogAccessories,
      language: 'en',
      name: 'Dog Accessories',
      description: 'Collars, leashes, clothing for dogs',
      meta_title: 'Dog Accessories',
      meta_description: 'Fashionable and functional dog accessories',
    })

    // Translations for Cat Food
    em.create(CategoryTranslation, {
      category: catFood,
      language: 'vi',
      name: 'Thức ăn cho mèo',
      description: 'Thức ăn dinh dưỡng cho mèo',
      meta_title: 'Thức ăn cho mèo',
      meta_description: 'Thức ăn chất lượng cao cho mèo cưng',
    })

    em.create(CategoryTranslation, {
      category: catFood,
      language: 'en',
      name: 'Cat Food',
      description: 'Nutritious food for cats',
      meta_title: 'Cat Food',
      meta_description: 'High quality cat food',
    })

    // Translations for Cat Toys
    em.create(CategoryTranslation, {
      category: catToys,
      language: 'vi',
      name: 'Đồ chơi cho mèo',
      description: 'Đồ chơi vui nhộn cho mèo',
      meta_title: 'Đồ chơi cho mèo',
      meta_description: 'Đồ chơi giúp mèo vui vẻ và khỏe mạnh',
    })

    em.create(CategoryTranslation, {
      category: catToys,
      language: 'en',
      name: 'Cat Toys',
      description: 'Fun toys for cats',
      meta_title: 'Cat Toys',
      meta_description: 'Toys to keep your cat entertained',
    })

    // Translations for Cat Accessories
    em.create(CategoryTranslation, {
      category: catAccessories,
      language: 'vi',
      name: 'Phụ kiện cho mèo',
      description: 'Nhà cho mèo, cây cào móng, vòng cổ',
      meta_title: 'Phụ kiện cho mèo',
      meta_description: 'Phụ kiện tiện ích cho mèo cưng',
    })

    em.create(CategoryTranslation, {
      category: catAccessories,
      language: 'en',
      name: 'Cat Accessories',
      description: 'Cat houses, scratching posts, collars',
      meta_title: 'Cat Accessories',
      meta_description: 'Essential accessories for cats',
    })

    // Translations for Bird Food
    em.create(CategoryTranslation, {
      category: birdFood,
      language: 'vi',
      name: 'Thức ăn cho chim',
      description: 'Hạt và thức ăn cho chim cảnh',
      meta_title: 'Thức ăn cho chim',
      meta_description: 'Thức ăn dinh dưỡng cho chim cảnh',
    })

    em.create(CategoryTranslation, {
      category: birdFood,
      language: 'en',
      name: 'Bird Food',
      description: 'Seeds and food for birds',
      meta_title: 'Bird Food',
      meta_description: 'Nutritious food for pet birds',
    })

    // Translations for Bird Cages
    em.create(CategoryTranslation, {
      category: birdCages,
      language: 'vi',
      name: 'Lồng chim',
      description: 'Lồng và phụ kiện cho chim',
      meta_title: 'Lồng chim',
      meta_description: 'Lồng chim đẹp và tiện dụng',
    })

    em.create(CategoryTranslation, {
      category: birdCages,
      language: 'en',
      name: 'Bird Cages',
      description: 'Cages and accessories for birds',
      meta_title: 'Bird Cages',
      meta_description: 'Beautiful and functional bird cages',
    })

    // Translations for Fish Food
    em.create(CategoryTranslation, {
      category: fishFood,
      language: 'vi',
      name: 'Thức ăn cho cá',
      description: 'Thức ăn cho cá cảnh',
      meta_title: 'Thức ăn cho cá',
      meta_description: 'Thức ăn chất lượng cho cá cảnh',
    })

    em.create(CategoryTranslation, {
      category: fishFood,
      language: 'en',
      name: 'Fish Food',
      description: 'Food for aquarium fish',
      meta_title: 'Fish Food',
      meta_description: 'Quality food for aquarium fish',
    })

    // Translations for Aquariums
    em.create(CategoryTranslation, {
      category: aquariums,
      language: 'vi',
      name: 'Bể cá',
      description: 'Bể cá và phụ kiện',
      meta_title: 'Bể cá cảnh',
      meta_description: 'Bể cá và thiết bị cho cá cảnh',
    })

    em.create(CategoryTranslation, {
      category: aquariums,
      language: 'en',
      name: 'Aquariums',
      description: 'Aquariums and accessories',
      meta_title: 'Aquariums',
      meta_description: 'Aquariums and equipment for fish',
    })

    await em.flush()
  }
}
