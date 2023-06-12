/* eslint-disable no-console */
import { ConnectionOptions, createConnection } from 'typeorm';
import { MenuItemEntity, MenuItemSize } from '../src/entities/menu-item.entity';
import { MenuItemOptionEntity } from '../src/entities/menu-item-option.entity';
import { config } from '../config/typeorm.config';

const menuItems = [
  {
    name: 'Small Burrito',
    size: MenuItemSize.Small,
    price: 600,
  },
  {
    name: 'Medium Burrito',
    size: MenuItemSize.Medium,
    price: 800,
  },
  {
    name: 'Large Burrito',
    size: MenuItemSize.Large,
    price: 1200,
  },
];

const menuItemOptions = [
  {
    name: 'black olives',
    price: 100,
  },
  {
    name: 'sour cream',
    price: 200,
  },
];

(async function (): Promise<void> {
  console.log(`start -> seed-test-data`);
  const options = {
    ...config,
    debug: true,
  };

  const connection = await createConnection(options as ConnectionOptions);

  const menuItemRepo = connection.getRepository(MenuItemEntity);
  const menuItemOptionRepo = connection.getRepository(MenuItemOptionEntity);

  const seedMenuItems = (): Array<Promise<void>> =>
    menuItems.map(async (menuItem) => {
      const newAItem = menuItemRepo.create(menuItem);
      await menuItemRepo.save(newAItem);
      return console.log(`done -> seed-menu-items ${menuItem.name}`);
    });

  const seedMenuItemOptions = (): Array<Promise<void>> =>
    menuItemOptions.map(async (menuItemOption) => {
      const newAItem = menuItemOptionRepo.create(menuItemOption);
      await menuItemOptionRepo.save(newAItem);
      return console.log(
        `done -> seed-menu-item-options ${menuItemOption.name}`,
      );
    });

  await Promise.all(seedMenuItems());
  await Promise.all(seedMenuItemOptions());
  await connection.close();
})();
